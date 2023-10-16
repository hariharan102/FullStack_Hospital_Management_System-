package com.example.demo.Controller;

import com.example.demo.Entity.PatientRead;
import com.example.demo.Service.PatientReadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/patient-reads")
public class PatientReadController {
    private final PatientReadService patientReadService;

    @Autowired
    public PatientReadController(PatientReadService patientReadService) {
        this.patientReadService = patientReadService;
    }

    @GetMapping
    public ResponseEntity<List<PatientRead>> getAllPatientReads() {
        List<PatientRead> patientReads = patientReadService.getAllPatientReads();
        return new ResponseEntity<>(patientReads, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PatientRead> getPatientReadById(@PathVariable Long id) {
        Optional<PatientRead> optionalPatientRead = patientReadService.getPatientReadById(id);
        return optionalPatientRead.map(patientRead -> new ResponseEntity<>(patientRead, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<PatientRead> createPatientRead(@RequestBody PatientRead patientRead) {
        PatientRead createdPatientRead = patientReadService.createPatientRead(patientRead);
        return new ResponseEntity<>(createdPatientRead, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PatientRead> updatePatientRead(@PathVariable Long id, @RequestBody PatientRead updatedPatientRead) {
        Optional<PatientRead> optionalPatientRead = patientReadService.getPatientReadById(id);
        if (optionalPatientRead.isPresent()) {
            PatientRead existingPatientRead = optionalPatientRead.get();
            existingPatientRead.setName(updatedPatientRead.getName());
            existingPatientRead.setAge(updatedPatientRead.getAge());
            existingPatientRead.setGender(updatedPatientRead.getGender());
            existingPatientRead.setAddress(updatedPatientRead.getAddress());
            existingPatientRead.setContactNumber(updatedPatientRead.getContactNumber());
            existingPatientRead.setCurrentProblem(updatedPatientRead.getCurrentProblem());
            existingPatientRead.setMedicalHistory(updatedPatientRead.getMedicalHistory());
            PatientRead updatedPatientReadObj = patientReadService.updatePatientRead(existingPatientRead);
            return new ResponseEntity<>(updatedPatientReadObj, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatientRead(@PathVariable Long id) {
        patientReadService.deletePatientRead(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
