package ge.combal.alan.arena.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by tsotne on 7/17/15.
 */

@Controller
public class LoginController {

    @RequestMapping("login")
    public ModelAndView login() {
        return new ModelAndView("login");
    }

    @RequestMapping("register")
    public ModelAndView register() {
        return new ModelAndView("register");
    }
}
