package com.thecloset.theCloset.service;


import com.thecloset.theCloset.model.User;
import com.thecloset.theCloset.repo.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User addUser(User user){
        return userRepository.save(user);
    }

    public Optional<User> findByUid(String uid) {
        return userRepository.findByUid(uid);
    }

    public Optional<User> getUserById(Integer id) {
        return userRepository.findById(id);
    }


    public User registerFirebaseUser(String uid, String email, String name) {
        return userRepository.save(new User(null, uid, name, email, null, null));
    }

}
