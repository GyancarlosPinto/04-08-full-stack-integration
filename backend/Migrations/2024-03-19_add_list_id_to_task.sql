\c tasks_db

CREATE TABLE lists (
    title VARCHAR(55), 
    created_at TIMESTAMP NOT NULL DEFAULT NOW(), 
    id SERIAL PRIMARY KEY
);

ALTER TABLE tasks ADD COLUMN list_id INT;

ALTER TABLE tasks
ADD CONSTRAINT fk_list
FOREIGN KEY (list_id)
REFERENCES lists(id);

INSERT INTO lists (title) VALUES('New List');

UPDATE tasks
SET list_id = 1;
