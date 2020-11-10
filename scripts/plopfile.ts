import nodePlop, { ActionType } from "node-plop";

const plop = nodePlop("plop-templates/plopfile.hbs");

interface Answers {
  name: string;
  description: string;
  isScoped: boolean;
  keywords: string;
}

async function createComponentPkg() {
  plop.setGenerator("component", {
    description: "Generates a component package",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Enter component package name:",
      },
      {
        type: "input",
        name: "description",
        message: "The description of this component:",
      },
      {
        type: "input",
        name: "keywords",
        message:
          "The keywords for this component or package (for package.json):",
      },
      {
        type: "confirm",
        name: "isScoped",
        message: "Whether package name should be scope? (e.g @scope/<pkg>):",
      },
    ],
    actions(answers) {
      const actions: ActionType[] = [];
      if (!answers) return actions;
      const { name, description, isScoped, keywords } = answers as Answers;
      const packageName = isScoped ? `@ui-machines/${name}` : name;
      actions.push({
        type: "addMany",
        templateFiles: "component-machine/**",
        destination: "../packages/{{name}}",
        base: "component-machine/",
        data: { description, keywords: keywords.split(","), packageName },
      });

      actions.push({
        type: "add",
        templateFile: "component-machine/README.md.hbs",
        path: "../packages/README.md",
      });

      return actions;
    },
  });

  const { runPrompts, runActions } = plop.getGenerator("component");
  const answers = await runPrompts();
  const result = await runActions(answers);
  console.log(result);
}

createComponentPkg();
