#!/bin/sh

. .env
mongodump --uri $BACKUP_DATABASE_URI --out .backup