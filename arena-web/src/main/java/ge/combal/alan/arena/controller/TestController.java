package ge.combal.alan.arena.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("test")
public class TestController {

    @PreAuthorize("hasRole('USER')")
    @RequestMapping("user")
    public String user(){
        return "USER";
    }

    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping("admin")
    public String admin(){
        return "ADMIN";
    }

}
