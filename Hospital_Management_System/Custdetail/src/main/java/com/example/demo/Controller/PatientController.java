package com.example.demo.Controller;

import com.example.demo.Entity.Patient;
import com.example.demo.Repository.PatientRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/patient")
public class PatientController {

    @Autowired
    private PatientRepository patientRepository;

    @GetMapping("/get")
    public Iterable<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    @GetMapping("/{currentPage}/{itemsPerPage}/{sortBy}/{sortOrder}")
    public Page<Patient> getData(@PathVariable(value = "currentPage") int page,
                                @PathVariable(value = "itemsPerPage") int size,
                                @PathVariable(value = "sortBy") String field,
                                @PathVariable(value = "sortOrder") String direction) {
        Pageable paging;
        if (direction.equals("asc")) {
            paging = PageRequest.of(page - 1, size).withSort(Sort.by(field));
        } else {
            paging = PageRequest.of(page - 1, size).withSort(Sort.by(field).descending());
        }
        return patientRepository.findAll(paging);
    }

    @PostMapping
    public Patient createPatient(@RequestBody Patient patient) {
        return patientRepository.save(patient);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Patient>> getPatientById(@PathVariable int id) {
        Optional<Patient> patient = patientRepository.findById(id);
        return ResponseEntity.ok(patient);
    }

    @PutMapping("/{id}")
    public Patient updatePatientDetails(@PathVariable int id, @RequestBody Patient patientData) {
        Optional<Patient> existingPatient = patientRepository.findById(id);
        if (existingPatient.isPresent()) {
            Patient patient = existingPatient.get();
            patient.setName(patientData.getName());
            patient.setAge(patientData.getAge());
            patient.setGender(patientData.getGender());
            patient.setAddress(patientData.getAddress());
            patient.setContactNumber(patientData.getContactNumber());
            patient.setCurrentProblem(patientData.getCurrentProblem());
            patient.setMedicalHistory(patientData.getMedicalHistory());
            return patientRepository.save(patient);
        } else {
            throw new IllegalArgumentException("Patient not found with id: " + id);
        }
    }

    @DeleteMapping("/{id}")
    public String deletePatientById(@PathVariable int id) {
        patientRepository.deleteById(id);
        return "Patient with ID: " + id + " has been deleted";
    }

    @DeleteMapping("/deleteAll")
    public String deleteAllPatients() {
        patientRepository.deleteAll();
        return "All patients deleted";
    }
}
