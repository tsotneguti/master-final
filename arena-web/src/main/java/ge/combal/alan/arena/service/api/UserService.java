package ge.combal.alan.arena.service.api;

import ge.combal.alan.arena.domain.User;
import ge.combal.alan.arena.model.UserModel;

/**
 * Created by nati on 03.07.2015.
 */
public interface UserService {
    User register(UserModel userModel);
}
