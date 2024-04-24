
const blankt = () => {
    // Clear form fields
    $('#filmNavn').val('');
    $('#antallBilletter').val('');
    $('#fornavn').val('');
    $('#etternavn').val('');
    $('#epost').val('');
    $('#tlfNr').val('');
};

function inputValidering() {
    const film = $("#filmNavn").val();
    const antall = $("#antallBilletter").val();
    const fornavn =  $("#fornavn").val();
    const etternavn = $("#etternavn").val();
    const telefon = $("#tlfNr").val();
    const epost = $("#epost").val();

    const visError = (elementId, message) => {
        $("#" + elementId).text(message);
    };

    const filmVal = () => {
        if (film === 'velgFilm') {
            visError('feilFilmNavn', 'Velg en film');
            return false;
        }
        return true;
    };

    const antallVal = () => {
        if (antall < 1) {
            visError('feilAntallBilletter', 'Antall må være 1 eller mer');
            return false;
        }
        return true;
    };

    const fornavnVal = () => {
        if (fornavn.trim() === '') {
            visError('feilFornavn', 'Skriv inn ditt fornavn');
            return false;
        }
        return true;
    };

    const etternavnVal = () => {
        if (etternavn.trim() === '') {
            visError('feilEtternavn', 'Skriv inn ditt etternavn');
            return false;
        }
        return true;
    };

    const telefonVal = () => {
        if (telefon.trim() === '' || !/^[0-9]{8}$/.test(telefon)) {
            visError('feilTelefonNr', 'Skriv inn gyldig telefonnummer');
            return false;
        }
        return true;
    };

    const epostVal = () => {
        if (epost.trim() === '' || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(epost)) {
            visError('feilEpost', 'Skriv inn gyldig epost');
            return false;
        }
        return true;
    };

    return filmVal() && antallVal() && fornavnVal() && etternavnVal() && telefonVal() && epostVal();
}

function kjopBillett() {
    if (inputValidering()) {
        const film = $("#filmNavn").val();
        const antall = $("#antallBilletter").val();
        const fornavn =  $("#fornavn").val();
        const etternavn = $("#etternavn").val();
        const telefon = $("#tlfNr").val();
        const epost = $("#epost").val();

        const billett = {
            film: film,
            antall: antall,
            fornavn: fornavn,
            etternavn: etternavn,
            epost: epost,
            telefon: telefon
        };

        $.post("/lagre", billett, function (){
            hentBilletter();
            blankt();
        });
    }
}

function hentBilletter() {
    $.get("/hentBilletter", function(data) {
        formaterData(data);
    });
}

function formaterData(billetter) {
    let ut = "<table class='table'><thead><tr><th>Film</th><th>Antall Billetter</th><th>Fornavn</th><th>Etternavn</th><th>Epost</th><th>Telefonnummer</th></tr></thead><tbody>";

    for (const x of billetter) {
        ut += "<tr><td>" + x.film + "</td><td>" + x.antall + "</td><td>" +
            x.fornavn + "</td><td>" + x.etternavn + "</td><td>" + x.epost + "</td><td>" + x.telefon + "</td></tr>";
       // <td><a></a></td> // sletting og endring av enkelt video canvas, webrpog13
    }
    ut += "</tbody></table>";
    $("#output").html(ut);
}

function slettBillett() {
    $.get("/slett", function() {
        hentBilletter();
    });
    $("#output").html("");
    blankt();
}