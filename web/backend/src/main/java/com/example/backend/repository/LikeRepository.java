package com.example.backend.repository;

import com.example.backend.model.entity.Good;
import org.springframework.data.jpa.repository.JpaRepository;


public interface LikeRepository extends JpaRepository<Good,Long> {



}
