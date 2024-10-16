import os
import subprocess
import sys

def install_node():
    if sys.platform.startswith('linux'):
        subprocess.check_call(['sudo', 'apt', 'install', '-y', 'nodejs', 'npm'])
    elif sys.platform == 'darwin':
        print("Установите Node.js вручную для macOS.")
    elif sys.platform.startswith('win'):
        print("Установите Node.js вручную для Windows.")
    else:
        print("Неизвестная операционная система. Установите Node.js вручную.")

def clone_repositories():
    # Клонирование репозитория
    subprocess.check_call(['git', 'clone', '--branch', 'master', 'https://bitbucket.org/decimalteam/dsc-js-sdk.git'])
    os.chdir('dsc-js-sdk')

def install_javascript_dependencies():
    subprocess.check_call(['npm', 'install'])

def main():
    clone_repositories()
    install_node()
    install_javascript_dependencies()
    os.chdir('..')  # Возврат в предыдущую папку
    print("Установка завершена!")

if __name__ == '__main__':
    main()
