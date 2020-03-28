---
title: "About"
date: 2020-03-27T17:30:06-07:00
draft: false
---
cool.

### Hi

Aye

```swift
/// hanoi.swift
struct Tower: OptionSet {
  static let all: Tower = [.a, .b, .c]
  static let a = Tower(rawValue: 1 << 0)
  static let b = Tower(rawValue: 1 << 1)
  static let c = Tower(rawValue: 1 << 2)

  let rawValue: Int
}

typealias Move = (from: Tower, to: Tower)
typealias Disks = Int

func move(_ disks: Disks, from oneTower: Tower, to anotherTower: Tower) -> [Move] {
  guard disks > 0 else { return [] }
  
  let spareTower = Tower.all.subtracting([oneTower, anotherTower])
  let makeRoom   = move(disks - 1, from: oneTower, to: spareTower)
  let moveIt     = (from: oneTower, to: anotherTower)
  let moveRest   = move(disks - 1, from: spareTower, to: anotherTower)
  
  return makeRoom + [moveIt] + moveRest
}

move(10, from: .a, to: .c)
```

Where is it.