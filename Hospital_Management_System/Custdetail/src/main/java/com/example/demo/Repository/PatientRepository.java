package com.example.demo.Repository;

import com.example.demo.Entity.Patient;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface PatientRepository extends CrudRepository<Patient, Integer>, PagingAndSortingRepository<Patient, Integer> {

}
