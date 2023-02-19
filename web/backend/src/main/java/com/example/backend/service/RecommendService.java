package com.example.backend.service;

import com.example.backend.model.dto.RecommendRequestDto;

import com.example.backend.model.entity.Recommended;
import com.example.backend.repository.RecommendedRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;


@RequiredArgsConstructor
@Component
public class RecommendService {
    private final RecommendedRepository recommendedRepository;
    public void recommendSave(RecommendRequestDto recommendDto){
        URI uri = UriComponentsBuilder
                .fromUriString("http://localhost:8000")
                .path("/")
                .build()
                .toUri();
        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<String> result = restTemplate.postForEntity(uri,recommendDto,String.class);
    }
    public Recommended getRecommend(Long onlineid){
        return recommendedRepository.findRecommendedByOnlineid(onlineid);
    }

}
