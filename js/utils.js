const utils = {
    /**
     * Méthode permettant de vérifier les données saisies dans un fieldset (étape d'inscription)
     * @param HTMLElement fieldsetElement
     */
    checkFieldset: function(sectionElement) {
        // sectionElement est le nœud du DOM de la section pour laquelle on va vérifier les champs
        // On souhaite récupéré l'information de quelle étape on est en train de traiter
        const currentStep = parseInt(sectionElement.dataset.step);
        // On définit une variable contenant true
        // Si l'un des champs n'est pas correctement rempli, on le changera pour false
        // À la fin des vérifications, on retourne allOk qui confirme si oui ou non les champs sont bien remplis
        // Si ce n'est pas le cas, le code dans app.js stoppera la fonction et n'autorisera pas à changer d'étape
        let allOk = true;

        // Si on est à l'étape 1, on vérifie les champs de l'étape 1
        if (currentStep === 1) {
            // Chaque if vérifie un champs, précise le texte d'erreur à afficher au besoin
            // Si le champs n'est pas correctement rempli, on change la valeur de allOk pour un false
            if (!utils.checkFieldSelect("gender", "Veuillez sélectionner une civilité.")) {
                allOk = false;
            }
            if (!utils.checkFieldInputText("lastname", "Votre nom doit contenir au moins un caractère.", 1)) {
                allOk = false;
            }
            if (!utils.checkFieldInputText("firstname", "Votre prénom doit contenir au moins un caractère.", 1)) {
                allOk = false;
            }
            if (!utils.checkFieldInputText("email", "Votre email doit contenir au moins 6 caractères.", 6)) {
                allOk = false;
            }
        } else if (currentStep === 2) {
            if (!utils.checkFieldInputText("addr1", "Votre adresse doit contenir 5 caractères.", 5)) {
                allOk = false;
            }
            // On appelle checkFieldInputText de manière un peu sale,
            //   sans message d'erreur et avec un minimum obligatoire de 0 caractères, donc pas vraiment de minimum
            // Cette fonction fera une vérification pour rien, mais on compte sur elle pour reporter
            // la valeur de l'input#addr2 dans le récap.
            // C'est la seule raison qui nous fait l'écrire ici
            // Ça parait un peu sale, mais imaginons un formulaire beaucoup plus complexe,
            //   on aurait besoin de gérer plus qu'un cas particulier de la même façon
            utils.checkFieldInputText("addr2", "", 0);
            if (!utils.checkFieldInputText("cp", "Votre code postal doit contenir 5 caractères.", 5)) {
                allOk = false;
            }
            if (!utils.checkFieldInputText("city", "Votre ville doit contenir 3 caractères.", 3)) {
                allOk = false;
            }
        } else if (currentStep === 3) {
            if (!utils.checkFieldSelect("courses", "Veuillez sélectionner une formation.")) {
                allOk = false;
            }
            if (!utils.checkFieldSelect("status", "Veuillez sélectionner un statut professionnel.")) {
                allOk = false;
            }
        }
        return allOk;
    },
    /**
     * Méthode permettant de vérifier un champ de type <select>
     * @param String fieldId
     * @param String textError
     */
    checkFieldSelect: function(fieldId, textError) {
        // On reçoit l'id d'un <select> pour pouvoir le récupérer dans une variable
        const selectElement = document.getElementById(fieldId);
        // On doit vérifier que le <select> a bien une valeur choisie et pas la valeur par défaut
        if (selectElement.value > 0) {
            // Une valeur est bien choisie
            app.buildRecap(selectElement);
            return true;
        } else {
            // Rien n'est sélectionné
            // On va afficher le message d'erreur
            // On return false
            app.showError(selectElement, textError);
            return false;
        }
    },
    /**
     * Méthode permettant de vérifier un champ de type <input type="text">
     * @param String fieldId
     * @param String textError
     * @param Number minLength
     */
    checkFieldInputText: function(fieldId, textError, minLength) {
        // On récupère l'input dont on a reçu l'id
        const inputElement = document.getElementById(fieldId);

        // On prend la valeur de l'input (ce qui a été tapé)
        // On enlève les espaces superflus au début et à la fin de la string
        // On obtient une nouvelle string pour laquelle on demande la longueur
        // Si la longueur est supérieur ou égale à minLength on return true
        //    sinon on affiche le message d'erreur et on return false
        if (inputElement.value.trim().length >= minLength) {
            app.buildRecap(inputElement);
            return true;
        } else {
            app.showError(inputElement, textError);
            return false;
        }
    }
};
