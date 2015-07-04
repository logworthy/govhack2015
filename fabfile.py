from fabric.api import run, env, local

from app import private

env.user = private.SERVER_USER
env.password = private.SERVER_PASSWORD
env.hosts = private.HOSTS

def deploy():
    local("git push origin master")
    run("cd /srv/govhack2015 && git pull origin master")
    run("/srv/govhack2015/ENV/bin/pip install -r /srv/govhack2015/requirements.txt")
    run("cd /srv/govhack2015 && /srv/govhack2015/ENV/bin/python manage.py migrate")
    run("sudo supervisorctl restart govhack2015")
