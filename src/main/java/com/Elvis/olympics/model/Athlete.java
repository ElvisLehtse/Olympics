package com.Elvis.olympics.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.util.UUID;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table
public class Athlete {
    @Id
    @GeneratedValue (strategy = GenerationType.UUID)
    private UUID uuid;
    @Column(length = 64)
    private String firstName;
    @Column(length = 64)
    private String lastName;
    @Column
    private int age;
    @Column(length = 32)
    private String country;

}
