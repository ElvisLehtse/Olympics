package com.Elvis.olympics.repository;

import com.Elvis.olympics.model.Countries;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CountryRepository extends JpaRepository<Countries, String> {
    @Query("select c.name from Countries c order by c.name")
    List<String> findNameByOrderByNameAsc();
}
