package com.pikup.api.controller;

import com.pikup.api.exception.ResourceNotFoundException;
import com.pikup.api.model.User;
import com.pikup.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

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
