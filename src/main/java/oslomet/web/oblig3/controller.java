package oslomet.web.oblig3;

import java.util.List;

        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.web.bind.annotation.GetMapping;
        import org.springframework.web.bind.annotation.PostMapping;

        import org.springframework.web.bind.annotation.RestController;



@RestController
public class controller {

    @Autowired
    private billettRepo rep;

    @PostMapping("/lagre")
    public void lagreBillett(Billett innBillett) {
        rep.lagreBillett(innBillett);
    }
    @GetMapping("/hentBilletter")
    public List<Billett> hentBilletter(){
        return rep.hentAlleBilletter();
    }
    @GetMapping("/slett")
    public void slett() {
        rep.slettBillett();
    }
}