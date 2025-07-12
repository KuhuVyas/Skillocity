package com.example.GrowTogether.repository;

import com.example.GrowTogether.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    List<User> findByIsPublicTrue();
    // ✅ Required for login
}