package com.pikup.api.controller;

import com.pikup.api.exception.ResourceNotFoundException;
import com.pikup.api.model.User;
import com.pikup.api.repository.UserRepository;
import com.pikup.api.service.UserService;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * The type User controller.
 *
 * @author Benjamin Szabo
 */
@RestController
@RequestMapping("/user/v1")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    /**
     * Used for user login validation. Front end passes username and password via webservice call.
     * If username/password combination is correct, return 200 response.
     * If password is incorrect, return 403 response.
     * If username search doesn't return a match, 404 is returned.
     *
     * @return registered boolean
     */
    @GetMapping("/login/{username}/{password}")
    public ResponseEntity<User> getUser(@PathVariable(value = "username") String username,
                                        @PathVariable(value = "password") String password) {
        User user = userRepository.findByUsername(username);
        if(user!=null && !user.getPassword().equals(password))
            return ResponseEntity.status(403).body(null);
        else if(user!=null && user.getPassword().equals(password))
            return ResponseEntity.ok(user);
        else
            return ResponseEntity.status(404).body(null);
    }

    /**
     * Creates user object in database with a verification code and enabled set to false with a created time.
     * Sends verification email for user to verify their email address.
     *
     * @return registered boolean
     */
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public Map<String, Boolean> registerUser(@Validated @RequestBody User user, HttpServletRequest request) throws MessagingException, UnsupportedEncodingException {
        user.setVerificationCode(RandomString.make(64));
        user.setEnabled(false);
        user.setCreateTime(new Date());
        userRepository.save(user);
        Map<String, Boolean> response = new HashMap<>();
        userService.sendVerificationEmail(user, request);
        response.put("registered", Boolean.TRUE);
        return response;
    }

    /**
     * Searches for user in database by verification code.
     * If found, verification code is set to null, enabled is set to true.
     *
     * @return whether verification was successful or not
     */
    @GetMapping("/verify/{code}")
    public String verifyUser(@PathVariable("code") String code) {
        if (userService.verify(code)) {
            return "<div class=\"container text-center\">\n" +
                    "    <h3>Congratulations, your account has been verified.</h3>\n" +
//                    "    <h4><a th:href=\"/@{/login}\">Click here to Login</a></h4>\n" +
                    "</div>";
        } else {
            return "<div class=\"container text-center\">\n" +
                    "    <h3>Sorry, we could not verify account. It may be already verified,\n" +
                    "        or verification code is incorrect.</h3>\n" +
                    "</div>";
        }
    }

    /**
     * Get all users list.
     *
     * @return the list
     */
    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Gets users by username.
     *
     * @param username the user username
     * @return the users by username
     */
    @RequestMapping(value = "/users/find/{username}", method = RequestMethod.GET)
    public ResponseEntity<User> getUsersByUsername(@PathVariable(value = "username") String username) {
        User user = userRepository.findByUsername(username);
        return ResponseEntity.ok().body(user);
    }

    /**
     * Gets users by id.
     *
     * @param userId the user id
     * @return the users by id
     * @throws ResourceNotFoundException the resource not found exception
     */
    @RequestMapping(value = "/users/{id}", method = RequestMethod.GET)
    public ResponseEntity<User> getUsersById(@PathVariable(value = "id") Long userId)
            throws ResourceNotFoundException {
        User user =
                userRepository
                        .findById(userId)
                        .orElseThrow(() -> new ResourceNotFoundException("User not found on :: " + userId));
        return ResponseEntity.ok().body(user);
    }

    /**
     * Create user user.
     *
     * @param user the user
     * @return the user
     */
    @RequestMapping(value = "/users", method = RequestMethod.POST)
    public Map<String, Boolean> createUser(@Validated @RequestBody User user) {
        user.setCreateTime(new Date());
        userRepository.save(user);
        Map<String, Boolean> response = new HashMap<>();
        response.put("created", Boolean.TRUE);
        return response;
    }

    /**
     * Update user response entity.
     *
     * @param userId the user id
     * @param userDetails the user details
     * @return the response entity
     * @throws ResourceNotFoundException the resource not found exception
     */
    @RequestMapping(value = "/users/{id}", method = RequestMethod.PUT)
    public ResponseEntity<User> updateUser(
            @PathVariable(value = "id") Long userId, @Validated @RequestBody User userDetails)
            throws ResourceNotFoundException {

        User user =
                userRepository
                        .findById(userId)
                        .orElseThrow(() -> new ResourceNotFoundException("User not found on :: " + userId));

        user.setEmail(userDetails.getEmail());
        user.setUsername(userDetails.getUsername());
        user.setPassword(userDetails.getPassword());

        final User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    /**
     * Delete user map.
     *
     * @param userId the user id
     * @return the map
     * @throws Exception the exception
     */
    @RequestMapping(value = "/user/{id}", method = RequestMethod.DELETE)
    public Map<String, Boolean> deleteUser(@PathVariable(value = "id") Long userId) throws Exception {
        User user =
                userRepository
                        .findById(userId)
                        .orElseThrow(() -> new ResourceNotFoundException("User not found on :: " + userId));

        userRepository.delete(user);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
