"use client";

import { SearchManufacturerProps } from "@/types";
import React, { Fragment, useState } from "react";
import Image from "next/image";
import { manufacturers } from "@/constants";
import { Combobox, Transition } from "@headlessui/react";
const SearchManufacturer = ({
  manufacturer,
  setManufacturer,
}: SearchManufacturerProps) => {
  const [query, setQuery] = useState("");
  const filterManufacturer =
    query === ""
      ? manufacturers
      : manufacturers.filter((item: string) =>
          item
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
  return (
    <div className="search-manufacturer">
      <Combobox>
        <div className=" relative w-full">
          <Combobox.Button className=" absolute top-[14px]">
            <Image
              src="/car-logo.svg"
              alt="car logo"
              width={20}
              height={20}
              className=" ml-4"
            />
          </Combobox.Button>
          <Combobox.Input
            className="search-manufacturer__input"
            placeholder="volkswagen"
            displayValue={(manufacturer: string) => manufacturer}
            onChange={(e) => setQuery(e.target.value)}
          ></Combobox.Input>
        </div>
        <Transition
          as={Fragment}
          leave=" transition ease-in duration-100"
          leaveFrom=" opacity-100"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options>
            {filterManufacturer.length === 0 && query !== "" ? (
              <Combobox.Option
                value={query}
                className="search-manufacturer__options"
              >
                Create "{query}"
              </Combobox.Option>
            ) : (
              filterManufacturer.map((item: string) => (
                <Combobox.Option
                  key={item}
                  value={item}
                  className={({ active }) =>
                    `relative search-manufacturer__options ${
                      active ? "bg-primary-blue text-white" : "text-gray-900"
                    }`
                  }
                >
                  {item}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </Combobox>
    </div>
  );
};

export default SearchManufacturer;