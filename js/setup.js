'use strict';

const WIZARD_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const WIZARD_SURNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const WIZARD_COATCOLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const WIZARD_EYESCOLOR = [`black`, `red`, `blue`, `yellow`, `green`];
const WIZARD_NUMBER = 4;

let wizards = [];

const userDialog = document.querySelector(`.setup`);
userDialog.classList.remove(`hidden`);

const similarListElement = userDialog.querySelector(`.setup-similar-list`);

const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);

const renderNumber = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const renderName = (names, surnames) => {
  let name;

  if (renderNumber(2)) {
    name = names[renderNumber(names.length)] + ` ` + surnames[renderNumber(surnames.length)];
  } else {
    name = surnames[renderNumber(surnames.length)] + ` ` + names[renderNumber(names.length)];
  }
  return name;
};

const renderWizards = function () {
  for (let i = 0; i < WIZARD_NUMBER; i++) {
    const wizardName = renderName(WIZARD_NAMES, WIZARD_SURNAMES);
    const wizardColor = WIZARD_COATCOLORS[renderNumber(WIZARD_COATCOLORS.length)];
    const wizardEyes = WIZARD_EYESCOLOR[renderNumber(WIZARD_EYESCOLOR.length)];

    wizards[i] = {name: wizardName, coatColor: wizardColor, eyesColor: wizardEyes};
  }
};

const renderWizard = function (wizard) {
  const wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

const fragment = document.createDocumentFragment();

renderWizards();

for (let i = 0; i < WIZARD_NUMBER; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);

