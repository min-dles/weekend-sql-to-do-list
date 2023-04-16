--DATABASE NAME: weekend-to-do-app
--NOTE: There are TWO tables in this Database. One to track TASKS, and one to track USERS

-- CREATE THE TASKS TABLE:
	-- FALSE status means task is pending, TRUE status means task is complete 
CREATE TABLE tasks (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (255),
	"status" BOOL);
	
-- REMINDER: false values mean task is in progress (NOT completed)
INSERT INTO tasks
	("task", "status")
	VALUES
	('drop off Lola at doggie daycare', 'false'),
	('go grocery shopping', 'false'), 
	('wash the windows', 'false');

-- CREATE THE USERS TABLE:
CREATE TABLE users (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (100));
	
INSERT INTO users 
	("name")
	VALUES
	('mandi');