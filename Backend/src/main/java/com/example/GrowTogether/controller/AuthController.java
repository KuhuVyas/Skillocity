package com.example.GrowTogether.controller;

import com.example.GrowTogether.entity.User;
import com.example.GrowTogether.service.UserService;
import com.example.GrowTogether.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ✅ Register
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> userMap) {
        String name = userMap.get("name");
        String email = userMap.get("email");
        String password = passwordEncoder.encode(userMap.get("password"));

        if (userService.findByEmail(email) != null) {
            return ResponseEntity.badRequest().body("User already exists");
        }

        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(password);
        userService.save(user); // you'll need to add this in service + repo

        return ResponseEntity.ok("User registered successfully");
    }

    // ✅ Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginMap) {
        String email = loginMap.get("email");
        String password = loginMap.get("password");

        User user = userService.findByEmail(email);
        if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        String token = jwtUtil.generateToken(user.getId().toString());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("userId", user.getId());
        response.put("name", user.getName());

        return ResponseEntity.ok(response);
    }
}