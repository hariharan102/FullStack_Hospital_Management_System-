package com.example.demo.Service;

import com.example.demo.Entity.Patient;
import com.example.demo.Repository.PatientRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class PatientService {
    @Autowired
    private PatientRepository patientRepository;

    public Page<Patient> sortingAndPaging(int page, int size, String field) {
        Pageable paging = PageRequest.of(page, size).withSort(Sort.by(field));
        return patientRepository.findAll(paging);
    }

    public Page<Patient> paging(int currentPage, int itemsPerPage) {
        Pageable paging = PageRequest.of(currentPage, itemsPerPage);
        return patientRepository.findAll(paging);
    }
}
