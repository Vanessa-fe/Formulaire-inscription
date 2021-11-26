const app = {
    /**
     * Méthode d'initialisation de notre module
     */
    init: function() {
        // On récupère tous les boutons qui correspondent à des changements d'étapes dans le formulaire
        const buttons = document.querySelectorAll("button.form-group__validate--step");
        // buttons est comme un tableau, on ne peut pas exécuter buttons.addEventListener()
        // On va devoir faire un addEventListener sur chaque élément button du tableau
        buttons.forEach(function (buttonNode) {
            // buttonNode c'est un nœud du DOM de type <button>
            // Pour chaque buttonNode, on exécute addEventListener()
            buttonNode.addEventListener('click', app.handleNextStepClick);
        });
    },
    handleNextStepClick: function (evt) {
        // On récupère le bouton clické
        const buttonNode = evt.currentTarget;
        // On récupère la section qui englobe ce bouton
        const sectionNode = buttonNode.closest("section");
        if (utils.checkFieldset(sectionNode) === false) {
            return null;
        }
        // À partir de là, on peut récupérer l'étape où on est
        // Elle est dans l'attribut data-step qu'on peut récupérer en JS avec .dataset.step
        // On récupère forcément une string, donc on la transforme en integer avec parseInt()
        const currentStep = parseInt(sectionNode.dataset.step);
        const nextStep = currentStep + 1;
        // On peut supprimer la classe .signup__step--active
        sectionNode.classList.remove("signup__step--active");
        // On peut sélectionner la section de l'étape suivante pour lui ajouter la classe .signup__step--active
        // On récupère la section suivante selon nextStep. Si nextStep > 3, on récupère le récap, sinon on récupère l'étape suivante
        let nextSectionNode;
        if (nextStep > 3) {
            nextSectionNode = document.querySelector("#recap");
        } else {
            nextSectionNode = document.querySelector("#wizard-step" + nextStep);
        }
        nextSectionNode.classList.add("signup__step--active");
    },
    showError: function(fieldElement, textError) {
        // Notre champs est suivi d'une div.form-group__error
        // On peut récupérer cette div grâce à .nextElementSibling,
        // c'est une propriété qui donne le prochain élément voisin, enfant du même parent que fieldElement
        // const errorNode = fieldElement.nextElementSibling;
        // Attention, si l'HTML change, ça peut casser errorNode ici.
        // Ce serait beaucoup plus précis, de sélection cette div en l'identifiant avec précision.
        const errorNode = fieldElement.closest(".form-group").querySelector(".form-group__error");
        // On place le texte dans la div
        errorNode.innerText = textError;
        // On change la propriété CSS display pour rendre cette div visible
        errorNode.style.display = "block";
    },
    buildRecap: function (fieldElement) {
        const spanRecapId = "recap-" + fieldElement.id;
        const recapElement = document.getElementById(spanRecapId);

        console.log(fieldElement, fieldElement.tagName, fieldElement.tagName === "SELECT");

        // Selon qu'on a un input ou un select, on ne reporte pas les données de la même façon
        // On va faire la différence, grâce à la propriété .tagName qui nous le nom de la balise
        if (fieldElement.tagName === "INPUT") {
            recapElement.innerText = fieldElement.value;
        } else if (fieldElement.tagName === "SELECT") {
            recapElement.innerText = fieldElement.selectedOptions[0].textContent;
        }
    }
};

document.addEventListener('DOMContentLoaded', app.init);
