package com.example.demo.Repository;

import com.example.demo.Entity.PatientRead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientReadRepository extends JpaRepository<PatientRead, Long> {
}
