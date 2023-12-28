import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { selectMembers } from "../../api/endpoints/member.endpoint";
import { useParams } from "react-router-dom";
import Avatar from "../util/Avatar";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function MembersDropdown() {
  const projectId = Number(useParams().projectId);
  const { members } = selectMembers(projectId);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-between gap-x-1.5 rounded-sm bg-c-6 px-3 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-c-7">
          Members
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {members &&
              members.map(({ id, userId, username, profileUrl }) => (
                <Menu.Item key={id}>
                  {({ active }) => (
                    <div
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block flex items-center gap-2 border-s-primary px-4 py-2 text-sm hover:border-s-2"
                      )}
                    >
                      <Avatar key={userId} src={profileUrl} name={username} />
                      {username}
                    </div>
                  )}
                </Menu.Item>
              ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
