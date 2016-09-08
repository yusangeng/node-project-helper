# node-project-helper

Several useful helper utils for node.js project.

## Install

```
npm install node-project-helper -g
```

## Usage

### Gen release info

```
npm ri -p ${p} -s ${s} -f ${f} -o ${o}
```

**parameters:**

* p: Project root path, the same to dir of package.json.
* s: Version Control System(VCS) type, "svn" or "git".
* f: File format, "json" or "js", the output was printed in console if f was left blank.
* o: Output file name.

### Get VCS version

```
npm vv -p ${p} -s ${s}
```

### Get package version

```
npm pv -p ${p}
```

### Pack files

```
npm pk -p ${p} -i ${i} -o ${o} -s ${s}
```

**parameters:**

* i: Input path.
* o: Output path.

The package file is named in format of "${PackageName}_v${PackageVersion}_r${VCSVersion}.zip".
