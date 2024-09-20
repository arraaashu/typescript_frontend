import * as ts from "typescript";
// This function is for traversing through the AST nodes.
const visit = (node, obj) => {
    // Checking if the node is a type declaration
    if (ts.isTypeAliasDeclaration(node)) {
        const name = node.name.getText();
        obj[name.toLowerCase()] = {};
        const typeNode = node.type;
        // If the type is an object typewe will be handling its properties
        if (ts.isTypeLiteralNode(typeNode)) {
            typeNode.members.forEach((member) => {
                if (ts.isPropertySignature(member)) {
                    const propName = member.name.getText();
                    const propType = member.type;
                    if (propType && ts.isUnionTypeNode(propType)) {
                        // If the property type is a combination of strings then  extracting the options
                        const values = propType.types
                            .filter(ts.isLiteralTypeNode)
                            .map((literalType) => literalType.literal.text);
                        obj[name.toLowerCase()][`${propName}s`] = values;
                    }
                }
            });
        }
    }
    // Recursively visiting the child nodes
    ts.forEachChild(node, (child) => visit(child, obj));
};
// convertToObject function is parsing the input type string and calling the visit function
const convertToObject = (type) => {
    const sourceFile = ts.createSourceFile("temp.ts", // temp file
    type, // input: TypeScript code
    ts.ScriptTarget.Latest, true, // for parsing in a script mode
    ts.ScriptKind.TS);
    const result = {};
    visit(sourceFile, result);
    return result;
};
//test case
const typeString = `type Button = {
  variant: "solid" | "text";
};`;
console.log(convertToObject(typeString));
