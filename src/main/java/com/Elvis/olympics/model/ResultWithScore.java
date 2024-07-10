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
public class ResultWithScore {

    @Id
    @GeneratedValue (strategy = GenerationType.UUID)
    private UUID uuid;
    @Column(length = 32)
    private String discipline;
    @Column
    private int result;
    @Column
    private Integer score;
    @ManyToOne
    private Athlete athlete;
}
