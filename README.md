Govhack 2015: Regional News Explorer (tentative title)
======================================================

## Server setup (Debian-based OS)

```
> apt-get update
> apt-get install -y postgresql postgresql-contrib
> apt-get install -y postgis postgresql-9.3-postgis-2.1
> createdb local_explorer
> sudo -u postgres psql -c "CREATE EXTENSION postgis; CREATE EXTENSION postgis_topology;" local_explorer
