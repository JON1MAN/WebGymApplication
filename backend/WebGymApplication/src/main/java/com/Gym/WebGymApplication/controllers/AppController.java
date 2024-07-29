package com.Gym.WebGymApplication.controllers;


import com.Gym.WebGymApplication.dtos.LoginUserDto;
import com.Gym.WebGymApplication.dtos.RegisterUserDto;
import com.Gym.WebGymApplication.models.User;
import com.Gym.WebGymApplication.services.AuthenticationService;
import com.Gym.WebGymApplication.services.JwtService;
import com.Gym.WebGymApplication.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
public class AppController {

    private UserService userService;
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> showUsers(){
        List<User> users = userService.showAllUsers();
        System.out.println("Retrieved users: " + users);
        if(users.isEmpty()){
            return ResponseEntity.noContent().build(); // No users found
        }
        return ResponseEntity.ok(users);
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody RegisterUserDto registerUserDto){
        User registeredUser = authenticationService.signup(registerUserDto);

        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(jwtToken);
        loginResponse.setExpiresIn(jwtService.getExpirationTime());

        return ResponseEntity.ok(loginResponse);
    }

}
