import nodePlop, { ActionType } from "node-plop";

const plop = nodePlop("oss-monorepo");

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
        message: "Enter component package name",
      },
      {
        type: "input",
        name: "description",
        message: "The description of this component",
      },
      {
        type: "input",
        name: "keywords",
        message:
          "The keywords for this component or package (for package.json)",
      },
      {
        type: "confirm",
        name: "isScoped",
        message: "Whether package name should be scope? (e.g @scope/<pkg>)",
      },
    ],
    actions(answers) {
      const actions: ActionType[] = [];
      if (!answers) return actions;
      const { name, description, isScoped, keywords } = answers as Answers;
      const packageName = isScoped ? `@ui-machines/${name}` : name;
      actions.push({
        type: "addMany",
        templateFiles: "../plop-templates/component-machine/**",
        base: "../plop-templates/component-machine/",
        destination: `../packages/${name}`,
        data: { description, keywords: keywords.split(","), packageName },
      });
      return actions;
    },
  });

  const { runPrompts, runActions } = plop.getGenerator("controller");
  const answers = await runPrompts();
  await runActions(answers);
}

createComponentPkg();
