# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/bionic64"

  config.vm.network "forwarded_port", guest: 8008, host: 8008
  config.vm.network "forwarded_port", guest: 8448, host: 8448
  config.vm.network "forwarded_port", guest: 4000, host: 4000
  config.vm.network "forwarded_port", guest: 9000, host: 9000
  config.vm.network "forwarded_port", guest: 8182, host: 8182
  config.vm.network "forwarded_port", guest: 7687, host: 7687
  config.vm.network "forwarded_port", guest: 7474, host: 7474

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  config.vm.network "private_network", ip: "192.168.33.10"

# Mixed up path
  # config.vm.synced_folder "repos/imago_front", "/home/front/imago_front"
  # config.vm.synced_folder "repos/imago", "/home/imago/imago"

  config.vm.provider "virtualbox" do |vb|
    # Display the VirtualBox GUI when booting the machine
    vb.gui = true
  
    # Customize the amount of memory on the VM:
    vb.memory = "4096"
  end
  
  
    config.vm.provision "ansible", type: "ansible", run: "always" do |ansible|
      ansible.limit = "all"
      ansible.playbook = "ansible/setup.dev.yml"
      ansible.inventory_path = "ansible/hosts.ini"
    end
end


# echo  "Disabling IPv6"
# echo "net.ipv6.conf.all.disable_ipv6 = 1
#       net.ipv6.conf.default.disable_ipv6 = 1
#       net.ipv6.conf.lo.disable_ipv6 = 1
#       net.ipv6.conf.eth0.disable_ipv6 = 1" >> /etc/sysctl.conf
# sysctl -p