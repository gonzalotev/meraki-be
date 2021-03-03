CREATE OR REPLACE FUNCTION insertOnTables() RETURNS TRIGGER AS
$BODY$
BEGIN
	insert into "assignment" (segment) values (new.id);
	insert into "fieldData" (segment) values (new.id);
	insert into "fieldData" (segment, turn) values (new.id, 'afternoon');
    RETURN new;
END;
$BODY$
language plpgsql;

CREATE TRIGGER triggerInsertOnTables
AFTER insert ON segment
FOR EACH row
	EXECUTE PROCEDURE insertOnTables();