INSERT INTO departments (dep_name)
VALUES ("Mainline"),
       ("IFK Hot"),
       ("IFK Cold"),
       ("Prepping"),
       ("Cutting"),
       ("Mixing");

INSERT INTO roles (title, salary,dep_id)
VALUES ("Production Manager Mainline", 52000,1),
       ("Production Manager Cold", 52000,3),
       ("Production Manager Hot", 104000,2),
       ("Executive Sous-Chef", 62400,2),
       ("Lead Hot", 33800,2),
       ("Lead Cold", 41600,3),
       ("Prepper", 29120,4),
       ("Cutter", 29120,5),
       ("Mixer", 29120,6),
       ("Production Worker Hot", 29120,2),
       ("Production Worker Cold", 29120,3);
    
INSERT INTO employees (first_name, last_name,role_id,manager_id)
VALUES ("Lance","Holton" ,3,NULL),
       ("Carnise","Hart" ,2,NULL),
       ("Luz","Garzon" ,1,NULL),
       ("Thomas","Beswick" ,4,1),
       ("Rosa","Pichardo" ,5,1),
       ("Edny","Nunez" ,5,1),
       ("Nico","Arboine" ,5,1),
       ("Raul","Rangel" ,6,1),
       ("Ramon","Carmona" ,7,1),
       ("Freddy","Palacios" ,7,1),
       ("Maria","Lopez" ,7,1),
       ("Audelina","Lopez" ,7,1),
       ("Mariangeles","Lozada" ,10,1),
       ("Estefanie","Oquendo" ,10,1),
       ("Elmer", "Torres",8,2),
       ("Tatiana", "Lozada",8,2),
       ("Jorge", "Urdaneta",8,2),
       ("Jose", "Nose",8,2),
       ("Araceli","Arambula",9,3),
       ("Paola", "De Carmona",9,3),
       ("Carmen", "Garcia",9,3),
       ("Genesis","Reina",11,2);


