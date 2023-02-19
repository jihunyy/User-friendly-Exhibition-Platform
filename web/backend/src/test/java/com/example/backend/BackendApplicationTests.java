package com.example.backend;

import com.example.backend.model.entity.User;
import com.example.backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class BackendApplicationTests {
    @Autowired
    private UserRepository userRepository;

    @Test
    void contextLoads() {
    }



}
