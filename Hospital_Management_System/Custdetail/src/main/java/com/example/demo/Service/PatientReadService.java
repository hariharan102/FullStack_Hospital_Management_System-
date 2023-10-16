package com.example.demo.Service;

import com.example.demo.Entity.PatientRead;
import com.example.demo.Repository.PatientReadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientReadService {
    private final PatientReadRepository patientReadRepository;

    @Autowired
    public PatientReadService(PatientReadRepository patientReadRepository) {
        this.patientReadRepository = patientReadRepository;
    }

    public List<PatientRead> getAllPatientReads() {
        return patientReadRepository.findAll();
    }

    public Optional<PatientRead> getPatientReadById(Long id) {
        return patientReadRepository.findById(id);
    }

    public PatientRead createPatientRead(PatientRead patientRead) {
        return patientReadRepository.save(patientRead);
    }

    public PatientRead updatePatientRead(PatientRead patientRead) {
        return patientReadRepository.save(patientRead);
    }

    public void deletePatientRead(Long id) {
        patientReadRepository.deleteById(id);
    }
}
