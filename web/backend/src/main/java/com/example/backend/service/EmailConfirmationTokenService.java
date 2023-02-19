package com.example.backend.service;

import com.example.backend.model.entity.EmailConfirmationToken;
import com.example.backend.repository.EmailConfirmationTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class EmailConfirmationTokenService {
    private final EmailConfirmationTokenRepository emailConfirmationTokenRepository;
    private final EmailSenderService emailSenderService;
    /**
     * 이메일 인증 토큰 생성
     * @return
     */
    @Async
    public String createEmailConfirmationToken(Long userId, String receiverEmail){



        EmailConfirmationToken emailConfirmationToken = EmailConfirmationToken.createEmailConfirmationToken(userId);
        emailConfirmationTokenRepository.save(emailConfirmationToken);

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(receiverEmail);
        mailMessage.setSubject("아틀리에 이메일 인증");
        mailMessage.setText("http://localhost:8080/api/confirm-email?token=" + emailConfirmationToken.getId());
        emailSenderService.sendEmail(mailMessage);


        return emailConfirmationToken.getId();
    }

    /**
     * 유효한 토큰 가져오기
     * @param confirmationTokenId
     * @return
     */
    public EmailConfirmationToken findByIdAndExpirationDateAfterAndExpired(String confirmationTokenId) throws Exception {
        Optional<EmailConfirmationToken> confirmationToken = emailConfirmationTokenRepository.findByIdAndExpirationDateAfterAndExpired(confirmationTokenId, LocalDateTime.now(),false);
        return confirmationToken.orElseThrow(()-> new Exception());
    };
}
