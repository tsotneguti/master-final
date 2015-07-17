package ge.combal.alan.arena.service.impl;

import ge.combal.alan.arena.domain.User;
import ge.combal.alan.arena.model.UserModel;
import ge.combal.alan.arena.repository.UserRepository;
import ge.combal.alan.arena.service.api.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Created by nati on 03.07.2015.
 */
@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder encoder;

    @Override
    public User register(UserModel userModel) {

        User user = new User();

        user.setUsername(userModel.getUsername());
        user.setPassword(encoder.encode(userModel.getPassword()));

        return repository.save(user);
    }
}
