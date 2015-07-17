package ge.combal.alan.arena.controller;

import ge.combal.alan.arena.domain.User;
import ge.combal.alan.arena.model.UserModel;
import ge.combal.alan.arena.service.api.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

/**
 * Created by nati on 03.07.2015.
 */
@RequestMapping("user")
@RestController
public class UserController {

    @Autowired
    UserService service;

    @RequestMapping(value = "register",method = RequestMethod.POST)
    public User register(@RequestBody @Valid UserModel userModel, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            throw new RuntimeException(bindingResult.getFieldError().toString());
        }
        return service.register(userModel);
    }

}
