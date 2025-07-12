package com.example.GrowTogether.service;

import com.example.GrowTogether.dto.UserDTO;
import com.example.GrowTogether.entity.User;
import com.example.GrowTogether.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {



    private final UserRepository userRepository;

    // ✅ Manual Constructor Injection
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(UserDTO dto) {
        User user = new User();
        user.setName(dto.getName());
        user.setLocation(dto.getLocation());
        user.setProfilePhotoUrl(dto.getProfilePhotoUrl());
        user.setAvailability(dto.getAvailability());
        user.setPublic(dto.isPublic());
        user.setSkillsOffered(dto.getSkillsOffered());
        user.setSkillsWanted(dto.getSkillsWanted());

        return userRepository.save(user);
    }

    public List<User> getPublicUsers() {
        return userRepository.findByIsPublicTrue();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> updateUser(Long id, UserDTO dto) {
        return userRepository.findById(id).map(user -> {
            user.setName(dto.getName());
            user.setLocation(dto.getLocation());
            user.setProfilePhotoUrl(dto.getProfilePhotoUrl());
            user.setAvailability(dto.getAvailability());
            user.setSkillsOffered(dto.getSkillsOffered());
            user.setSkillsWanted(dto.getSkillsWanted());
            user.setPublic(dto.isPublic());
            return userRepository.save(user);
        });
    }

    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User save(User user) {
        return userRepository.save(user);
    }


}