# Steps of Installing and Setting up Ansible 

##  Prerequisite

1. Install Ansible (from mac, you can "brew install ansible")

2. Run "sudo vim (or whichever file editor tool you like to use) /etc/ansible/hosts"

3. Remove all data in there, then paste this line of code in there: 

```
[servers]
backend ansible_host=54.90.174.111
frontend ansible_host=100.26.242.139

[all:vars]
ansible_python_interpreter=/usr/bin/python3
ansible_ssh_private_key_file=/etc/ansible/EC2_Host_Key_Pair.pem

[local]
local_machine ansible_connection=local ansible_host=localhost
```

4. Run "sudo vim /etc/ansible/ansible.cfg" then paste this code:
```
[defaults]
host_key_checking = false
[ssh_connection]
ssh_args = -o ForwardAgent=yes
```
5. Create and Add SSH-Key (WITH EMAIL AS GIT@GITHUB.COM WHEN GENERATING SSH KEYFILE) (Link to follow: [HERE](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account))

6. Find "EC2_Host_Key_Pair.pem" file (which is used to access EC2 instances), then copy it to /etc/ansible folder.

7. Go to CI-CD/vars.yml, and change ```build_location``` variable name to your user folder name. (You can use ```pwd``` command in /Review folder to know what the name is)


## Run CI/CD Process

* Simply run `ansible-playbook CI-CD/main.yml` from terminal (where terminal location is at "Review" folder), and it will do all updating / installing contents to servers!

### Couple of Notes
* Note that Updating frontend will take a while as it is building frontend code to static, and copying over to server (probably staying SSH connection and sending file one at a time does take a while)