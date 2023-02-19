package com.example.backend.repository;

import com.example.backend.model.entity.OfflineExhibition;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface OfflineExhibitionRepository extends JpaRepository<OfflineExhibition,Long> {
    public OfflineExhibition findOfflineExhibitionById(Long id);

}
