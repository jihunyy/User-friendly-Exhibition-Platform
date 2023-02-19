package com.example.backend.repository;


import com.example.backend.model.entity.EmailConfirmationToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;


public interface EmailConfirmationTokenRepository extends JpaRepository<EmailConfirmationToken,String> {
    Optional<EmailConfirmationToken> findByIdAndExpirationDateAfterAndExpired(String confirmationTokenId, LocalDateTime now, boolean expired);
}
