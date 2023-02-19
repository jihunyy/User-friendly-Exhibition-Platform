package com.example.backend.service;

import com.example.backend.model.dto.RecommendExhibitionRequestDto;
import com.example.backend.model.dto.RecommendRequestDto;
import com.example.backend.model.dto.RecommendedExhibitionDto;
import com.example.backend.model.entity.OfflineExhibition;
import com.example.backend.repository.OfflineExhibitionRepository;
import com.example.backend.repository.OnlineExhibitionRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.JSONPObject;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.nio.charset.Charset;
import java.util.List;

@RequiredArgsConstructor
@Component
public class OfflineExhibitionService {
    private final OfflineExhibitionRepository offlineExhibitionRepository;

    public List<OfflineExhibition> getAllOfflineExhibition(){
        return offlineExhibitionRepository.findAll();
    }

    public OfflineExhibition getOfflineExhibitionById(Long exhibitionId){
        return offlineExhibitionRepository.findOfflineExhibitionById(exhibitionId);
    }

    public RecommendedExhibitionDto getRecommendedExhibition(String keyword1, String keyword2, String keyword3) throws JsonProcessingException {
        URI uri = UriComponentsBuilder
                .fromUriString("http://localhost:8000")
                .path("/recommended-exhibition-without-db")
                .encode(Charset.defaultCharset())
                .build()
                .toUri();

        RestTemplate restTemplate = new RestTemplate();

        RecommendExhibitionRequestDto req = new RecommendExhibitionRequestDto(keyword1, keyword2, keyword3);
        ObjectMapper objectMapper = new ObjectMapper();
        String reqJson=objectMapper.writeValueAsString(req);


        ResponseEntity<RecommendedExhibitionDto> response = restTemplate.postForEntity(uri,req,RecommendedExhibitionDto.class);
        
        return response.getBody();

    }

}
