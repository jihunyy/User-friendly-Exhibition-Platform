package com.example.backend.model.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class EmailConfirmationToken {

    private static final long EMAIL_TOKEN_EXPIRATION_TIME_VALUE = 5L;	//토큰 만료 시간

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    private String id;


    private LocalDateTime expirationDate;

    private boolean expired;

    //일부러 FK 사용 안함

    private Long userId;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createDate;

    @LastModifiedDate
    private LocalDateTime lastModifiedDate;

    /**
     * 이메일 인증 토큰 생성
     * @param userId
     * @return
     */
    public static EmailConfirmationToken createEmailConfirmationToken(Long userId){
        EmailConfirmationToken emailConfirmationToken = new EmailConfirmationToken();
        emailConfirmationToken.expirationDate = LocalDateTime.now().plusMinutes(EMAIL_TOKEN_EXPIRATION_TIME_VALUE); // 5분후 만료
        emailConfirmationToken.userId = userId;
        emailConfirmationToken.expired = false;
        return emailConfirmationToken;
    }

    /**
     * 토큰 사용으로 인한 만료
     */
    public void useToken(){
        expired = true;
    }
}
