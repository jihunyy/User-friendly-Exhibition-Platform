package com.example.backend.repository;

import com.example.backend.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findUserByUsername(String username);

    User findUserById(Long id);

    User getUserByUsername(String username);

    Boolean existsUserByUsername(String username);

    Boolean existsUserByNickname(String nickname);

    User findUserByNickname(String nickname);

    User getUserByNickname(String nickname);





}
