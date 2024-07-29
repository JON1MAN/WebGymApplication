package com.Gym.WebGymApplication.services;

import com.Gym.WebGymApplication.models.User;
import com.Gym.WebGymApplication.repositories.UserRepository;
import org.apache.tomcat.util.buf.UEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public List<User> showAllUsers(){

        List<User> users = new ArrayList<>();

        repository.findAll().forEach(users::add);

        return users;
    }

    public Optional<User> findByEmail(String email){
        return repository.findByEmail(email);
    }

    public void registerUser(User user){
        repository.save(user);
    }

}
